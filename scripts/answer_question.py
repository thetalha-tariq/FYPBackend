import sys
import joblib

# Load the question-answering pipeline
qa_pipeline = joblib.load('C:\\Final Year Project\\backend\\scripts\\qa_pipeline.pkl')

# Get the user question from the command line arguments
user_question = sys.argv[1]

# Load the context
with open('C:\\Final Year Project\\backend\\scripts\\context.txt', 'r') as f:
    context = f.read()

# Answer the question
result = qa_pipeline(question=user_question, context=context)
print(result['answer'])
