import PyPDF2

def extract_text_from_pdf(pdf_path):
    pdf_file = open(pdf_path, 'rb')
    pdf_reader = PyPDF2.PdfFileReader(pdf_file)
    text = ''
    for page_num in range(pdf_reader.numPages):
        page = pdf_reader.getPage(page_num)
        text += page.extract_text()
    pdf_file.close()
    return text

if __name__ == '__main__':
    pdf_path = 'C:\\Final Year Project\\backend\\scripts\\SUMMARY.pdf'
    text = extract_text_from_pdf(pdf_path)
    with open('C:\\Final Year Project\\backend\\scripts\\extracted_text.txt', 'w') as f:
        f.write(text)
