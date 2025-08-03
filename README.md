# FitSheets

A full-stack web application that allows users to log their workouts using only their voice. The app features an AI-powered backend that transcribes speech, extracts structured workout data, and generates a downloadable Excel log.

## Overview

**FitSheets** (`fitsheets.org`) is a complete, deployed web application designed to streamline fitness tracking. The frontend, built with React and TailwindCSS, provides a simple interface for recording audio. This audio is sent to a FastAPI backend, which uses a sophisticated pipeline of AI tools (`faster-whisper`, `spaCy`, `pandas`) to process the voice data. The final, structured workout log is then made available to the user as a downloadable Excel file.

The entire backend is containerized with Docker and deployed on an AWS EC2 instance, served securely over HTTPS via an Nginx reverse proxy.

## Features

* **Voice-to-Excel Pipeline**: Record your workout summary with your voice and receive a fully formatted Excel spreadsheet with exercises, sets, reps, and weights.

* **AI-Powered Data Extraction**: Utilizes `faster-whisper` for highly accurate speech-to-text transcription and `spaCy` for Natural Language Processing (NLP) to intelligently parse and structure the workout data.

* **Full-Stack Deployment**: A complete, real-world deployment architecture featuring a Vercel-hosted frontend and a Dockerized backend on AWS EC2.

* **Secure API**: The backend is served securely over HTTPS, enabled by an Nginx reverse proxy and a free SSL certificate from Let's Encrypt.

* **Responsive UI**: A clean and modern user interface built with React and TailwindCSS for a seamless experience on any device.

## Tech Stack

* **Frontend**: React, Vite, TailwindCSS

* **Backend**: Python, FastAPI

* **AI / Data Processing**:

  * **Speech-to-Text**: `faster-whisper`

  * **NLP**: `spaCy`

  * **Data Manipulation**: `pandas`

* **DevOps & Deployment**:

  * **Containerization**: Docker

  * **Cloud Hosting**: AWS EC2

  * **Web Server / Reverse Proxy**: Nginx

  * **SSL**: Certbot (Let's Encrypt)

  * **CI/CD**: Vercel (for frontend)
