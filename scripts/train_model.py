from transformers import pipeline, AutoModelForQuestionAnswering, AutoTokenizer
import joblib

# Load pre-trained model and tokenizer
model_name = "distilbert-base-uncased-distilled-squad"
model = AutoModelForQuestionAnswering.from_pretrained(model_name)
tokenizer = AutoTokenizer.from_pretrained(model_name)

# Load the extracted text
with open('C:\\Final Year Project\\backend\\scripts\\extracted_text.txt', 'r') as f:
    context = f.read()

# Save the context
with open('C:\\Final Year Project\\backend\\scripts\\context.txt', 'w') as f:
    f.write(context)

# Create the question-answering pipeline
qa_pipeline = pipeline('question-answering', model=model, tokenizer=tokenizer)

# Save the pipeline for later use
joblib.dump(qa_pipeline, 'C:\\Final Year Project\\backend\\scripts\\qa_pipeline.pkl')
print("Pipeline saved successfully!")
