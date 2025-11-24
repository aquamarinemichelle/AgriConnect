#!/usr/bin/env python3
import os
from app import app

if __name__ == '__main__':
    host = os.getenv('FLASK_HOST', '0.0.0.0')
    port = int(os.getenv('FLASK_PORT', 5000))
    
    print(f"🚀 Starting Animal Disease Diagnosis API...")
    app.run(host=host, port=port, debug=True)