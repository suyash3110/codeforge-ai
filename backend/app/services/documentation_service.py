from app.ai.gemini_service import ask_gemini
from app.services.repository_service import (
    get_summary,
    get_tree,
    get_readme,
)


def generate_documentation():

    summary = get_summary()

    tree = get_tree()

    readme = get_readme()

    prompt = f"""
You are a Principal Software Engineer.

Generate professional project documentation.

Repository Summary

{summary}

Repository Tree

{tree}

Existing README

{readme}

Generate:

# Project Overview

# Features

# Folder Structure

# Architecture

# Installation

# Usage

# Technologies Used

# Future Improvements

Return ONLY markdown.
"""

    return ask_gemini(prompt)