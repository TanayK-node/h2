import json
import random
import nltk
import torch
import torch.nn as nn
from flask import Flask, request, jsonify, render_template

nltk.download('wordnet')
nltk.download('punkt')


class ChatbotModel(nn.Module):
    def __init__(self, input_size, output_size):
        super(ChatbotModel, self).__init__()
        self.fc1 = nn.Linear(input_size, 512)
        self.fc2 = nn.Linear(512, 256)
        self.fc3 = nn.Linear(256, 128)
        self.fc4 = nn.Linear(128, 64)
        self.fc5 = nn.Linear(64, output_size)
        self.relu = nn.ReLU()
        self.dropout = nn.Dropout(0.3)
        self.batch_norm1 = nn.BatchNorm1d(512, track_running_stats=True)
        self.batch_norm2 = nn.BatchNorm1d(256, track_running_stats=True)
        self.batch_norm3 = nn.BatchNorm1d(128, track_running_stats=True)

    def forward(self, x):
        if x.dim() == 1:
            x = x.unsqueeze(0)
        x = self.relu(self.batch_norm1(self.fc1(x)))
        x = self.dropout(x)
        x = self.relu(self.batch_norm2(self.fc2(x)))
        x = self.dropout(x)
        x = self.relu(self.batch_norm3(self.fc3(x)))
        x = self.dropout(x)
        x = self.relu(self.fc4(x))
        x = self.dropout(x)
        x = self.fc5(x)
        return x


class ChatbotServer:
    def __init__(self, model_path, dimensions_path):
        with open(dimensions_path, 'r') as f:
            self.dimensions = json.load(f)

        self.vocabulary = self.dimensions['vocabulary']
        self.intents = self.dimensions['intents']
        self.intents_responses = self.dimensions['intents_responses']

        self.model = ChatbotModel(self.dimensions['input_size'], self.dimensions['output_size'])
        self.model.load_state_dict(torch.load(model_path, weights_only=True))
        self.model.eval()

    @staticmethod
    def tokenize_and_lemmatize(text):
        lemmatizer = nltk.WordNetLemmatizer()
        words = nltk.word_tokenize(text)
        return [lemmatizer.lemmatize(word.lower()) for word in words]

    def bag_of_words(self, words):
        return [1 if word in words else 0 for word in self.vocabulary]

    def select_best_response(self, input_words, responses):
        time_keywords = {"when", "date", "time", "schedule"}
        switch_keywords = {"switch", "transfer", "change"}
        fee_keywords = {"fee", "fees", "cost", "price"}
        input_words_set = set(input_words)

        is_time_question = bool(input_words_set.intersection(time_keywords))
        is_switch_question = bool(input_words_set.intersection(switch_keywords))
        is_fee_question = bool(input_words_set.intersection(fee_keywords))

        best_score = -1
        best_response = responses[0]

        for response in responses:
            response_words = set(self.tokenize_and_lemmatize(response))
            score = len(input_words_set.intersection(response_words))

            if is_time_question and any(word in response.lower() for word in ["next", "october", "schedule", "date"]):
                score += 10
            if is_switch_question and any(word in response.lower() for word in ["switch", "advisor", "portal", "transfer"]):
                score += 10
            if is_fee_question and any(word in response.lower() for word in ["fee", "fees", "cost", "price"]):
                score += 10

            if score > best_score:
                best_score = score
                best_response = response

        return best_response

    def process_message(self, input_message):
        words = self.tokenize_and_lemmatize(input_message)
        bag = self.bag_of_words(words)
        bag_tensor = torch.tensor([bag], dtype=torch.float32)

        with torch.no_grad():
            predictions = self.model(bag_tensor)
            probs = torch.softmax(predictions, dim=1)
            top_prob, top_idx = torch.max(probs, dim=1)
            predicted_class_index = top_idx.item()
            predicted_intent = self.intents[predicted_class_index]
            confidence = top_prob.item()

            if confidence < 0.7:
                return "I'm not sure how to answer that. Can you rephrase or ask something else?"

        responses = self.intents_responses[predicted_intent]
        return self.select_best_response(words, responses)


app = Flask(__name__)
chatbot = ChatbotServer('chatbotmodel.pth', 'dimensions.json')


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    if not data or 'message' not in data:
        return jsonify({'error': 'No message provided'}), 400

    message = data['message']
    response = chatbot.process_message(message)
    return jsonify({'response': response})


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)
