---
layout: page
date: 2024-06-25 16:40:16
title: " Automated NLP Pipeline for Web Content Extraction and Analysis"
# description: another project with an image 🎉
img: assets/img/15.webp
importance: 12
category: completed
toc:
  sidebar: left
---
## Overview

In a world driven by data, the ability to efficiently gather and interpret information is paramount. Countless organizations and individuals rely on online content to inform decisions, track emerging trends, and identify important insights. However, manually reviewing scores of web pages can be both time-consuming and prone to error. This is where the synergy of **web scraping**—to automatically collect data from diverse sources—and **text analysis**—to transform raw text into actionable insights—becomes indispensable. By harnessing these techniques, users can keep pace with the ever-growing volume of content on the internet and make more informed, data-driven decisions.


The project consists of two primary scripts:

- <mark>dataExtraction.py</mark> – Scrapes webpages for text content and stores them in structured text files.


- <mark>textAnalysis.py</mark> – Analyzes the extracted text using Natural Language Processing (NLP) and computational linguistic techniques to derive sentiment scores, readability metrics, and various textual statistics.


By integrating Python libraries such as requests, BeautifulSoup, NLTK, and textstat, this pipeline allows for the automated acquisition and systematic evaluation of textual data, making it highly valuable for research in computational linguistics.

## Web Scraping Module
 The web scraping component automates the acquisition of textual data from online sources, parsing webpage content while handling structural inconsistencies.

### Implementation Details
- URL Input Handling
   - The script reads an input Excel file (Input.xlsx) containing a structured list of URLs and unique identifiers (URL_ID).
   >The URL_ID acts as a linking key between the raw text data and its analysis, ensuring consistent tracking and structured output across the entire workflow. You can make and add your own URL_IDs.
    - URLs are processed sequentially to ensure systematic data retrieval.
- HTML Retrieval & Parsing
   - requests.get() is used to send HTTP GET requests with a User-Agent header to mimic a browser, reducing the likelihood of being blocked.
- BeautifulSoup parses the HTML document tree, extracting:
    - The title (<h1> tag)
    - The body text (<p> tags)
- Preprocessing & Storage
    - The text is written to .txt files, with filenames sanitized to remove OS-restricted characters.
    - A dedicated output/ directory ensures systematic storage of retrieved data.


## Text Analysis Module 
Once text extraction is complete, the text analysis module systematically processes and evaluates each file to derive linguistic and statistical insights.

### Processing Pipeline
- Tokenization & Text Normalization
    - Word tokenization (nltk.word_tokenize) to decompose text into atomic units.
    - Sentence tokenization (nltk.sent_tokenize) to segment the text at the discourse level.
    - Stopword removal (nltk.corpus.stopwords) to eliminate function words, improving feature relevance.

### Sentiment Analysis (VADER Lexicon-Based)
- The SentimentIntensityAnalyzer (nltk.sentiment.vader) assigns polarity scores:
    - **Positive Score:** Fraction of words classified as positive.
    - **Negative Score:** Fraction of words classified as negative.
    - **Polarity Score:** Compound sentiment measure in the range [-1,1].
    - **Subjectivity Score:** Computed as a function of absolute sentiment magnitudes.


### Lexical & Structural Feature Extraction
- **Word Count (nltk.word_tokenize):** Total number of words.
- **Syllable Count (textstat.syllable_count):** Aggregated phonetic complexity measure.
- **Complex Word Ratio:** Fraction of words with ≥3 syllables.
- **Personal Pronoun Frequency:** Presence of first/second-person references (I, we, you).

### Readability Assessment (textstat)
- **Fog Index (0.4 * (ASL + Complex Word %)):** Measures syntactic complexity.
- **Average Sentence Length (ASL):** Mean words per sentence.
- **Average Word Length:** Mean character count per token.
- **Syllables per Word Ratio:** Measures phonetic complexity.

### Data Structuring & Storage
- Extracted features are stored in a pandas DataFrame, indexed by URL_ID.
- Final results are exported to Excel (text_analysis_results.xlsx), sorted for consistency.