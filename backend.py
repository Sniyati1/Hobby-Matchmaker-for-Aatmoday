from flask import Flask, request, jsonify
import mysql.connector

app = Flask(__name__)

# Configure your MySQL connection
db_config = {
    'user': 'your_username',
    'password': 'your_password',
    'host': 'localhost',
    'database': 'hobby_matchmaker'
}

@app.route('/submit_preferences', methods=['POST'])
def submit_preferences():
    data = request.json
    environment = data.get('environment')
    social_preference = data.get('social_preference')
    budget = data.get('budget')

    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()
        query = ("INSERT INTO user_preferences (environment, social_preference, budget) "
                 "VALUES (%s, %s, %s)")
        cursor.execute(query, (environment, social_preference, budget))
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"status": "success", "message": "Preferences saved."}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)