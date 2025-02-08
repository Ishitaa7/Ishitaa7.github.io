---
layout: page
date: 2024-12-25 16:40:16
title: Machine Translation of Low Resource Languages
# description: with background image
img: assets/img/12.jpg
importance: 1
category: ongoing
related_publications: false
toc:
  sidebar: left
---

A project initiated under the **Ministry of Tribal Affairs**, dedicated to developing AI-powered translation tools for India's low-resource languages.

India is home to over 700 tribal languages, many of which lack formal documentation or digital resources. This linguistic gap limits access to technology and information for indigenous communities. To bridge this divide, I am developing AI-based language translation tools for one such language—Mundari, a tribal language native to the region I hail from.

## Consortium & Collaborating Institutions

This project is a collaborative effort involving leading educational institutions across India, each focusing on specific tribal languages:

| Name of Institution  | Name of Attached TRI  | Language  |
| :---                 |    :----             |   :---    |
| IIT Delhi            | Madhya Pradhesh       | Bhili     |
| IIIT Naya Raipur     | Gondi                 | Gondi     |
| BITS Pilani (Leader of the Consortium)   | Jharkhand for Mundari, Odisha for Kui | Mundari, Takri, Kui  |
| IIT Hyderabad        | Odhisha               | Santhali  |

## Dataset
The training dataset has over 50k sentences, provided by the Ministry of Tribal Affairs. It is sourced from various speeches given by the Prime Minister and the President of India. It also has some translations from NCERT Textbooks and Mann Ki Baat, a monthly radio program by Prime Minister Modi. This diverse dataset ensures linguistic richness and contextual accuracy in the trained model.

## Model
We have fine tuned our model based on Meta's fairseq library, m2m and added our own custom loss function. 

