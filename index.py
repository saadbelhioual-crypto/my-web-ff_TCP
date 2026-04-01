from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
import subprocess
import sys
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Configuration
TOKEN_FILE = 'amine_token.txt'
BOT_SCRIPTS = ['main.py', 'client.py']

@app.route('/api/start-bot', methods=['POST'])
def start_bot():
    try:
        data = request.json
        guest_id = data.get('guest_id')
        guest_password = data.get('guest_password')
        
        if not guest_id or not guest_password:
            return jsonify({
                'error': 'Missing credentials',
                'status': 'failed'
            }), 400
        
        # Save credentials to file
        credentials = {guest_id: guest_password}
        with open(TOKEN_FILE, 'w') as f:
            json.dump(credentials, f, indent=2)
        
        # Try to execute bot scripts
        bot_processes = []
        for script in BOT_SCRIPTS:
            if os.path.exists(script):
                try:
                    # Run bot script in background
                    process = subprocess.Popen(
                        [sys.executable, script],
                        stdout=subprocess.PIPE,
                        stderr=subprocess.PIPE,
                        text=True
                    )
                    bot_processes.append({
                        'script': script,
                        'pid': process.pid
                    })
                except Exception as e:
                    print(f"Error starting {script}: {e}")
        
        return jsonify({
            'success': True,
            'message': 'Bot started successfully',
            'guest_id': guest_id,
            'processes': bot_processes,
            'timestamp': datetime.now().isoformat()
        })
        
    except Exception as e:
        return jsonify({
            'error': str(e),
            'status': 'failed'
        }), 500

@app.route('/api/stop-bot', methods=['POST'])
def stop_bot():
    # Implementation for stopping bot processes
    return jsonify({
        'success': True,
        'message': 'Bot stopped'
    })

@app.route('/api/status', methods=['GET'])
def status():
    # Check if token file exists
    token_exists = os.path.exists(TOKEN_FILE)
    return jsonify({
        'status': 'active',
        'token_file_exists': token_exists,
        'timestamp': datetime.now().isoformat()
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)