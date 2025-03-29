from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__, template_folder="../frontend/templates", static_folder="../frontend/static")

# Set up the database path
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DB_PATH = os.path.join(BASE_DIR, "tasks.db")

# Configure the database URI
app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{DB_PATH}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

# Define the Task model
class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    due_date = db.Column(db.String(20))
    task_time = db.Column(db.String(20))
    priority = db.Column(db.String(20))
    completed = db.Column(db.Boolean, default=False)

# Initialize the database
with app.app_context():
    db.create_all()

@app.route("/")
def home():
    return render_template("index.html")

@app.route('/task-tracker')
def task_tracker():
    return render_template('task_tracker.html')

@app.route('/study-tracker')
def study_tracker():
    return render_template('study_tracker.html')

@app.route('/exercise-tracker')
def exercise_tracker():
    return render_template('exercise_tracker.html')

@app.route('/food-tracker')
def food_tracker():
    return render_template('food_tracker.html')

@app.route('/selfcare-tracker')
def selfcare_tracker():
    return render_template('selfcare_tracker.html')

@app.route('/tasks', methods=['GET'])
def get_tasks():
    tasks = Task.query.all()
    return jsonify([
        {"id": task.id, "name": task.name, "due_date": task.due_date, 
         "task_time": task.task_time, "priority": task.priority, "completed": task.completed}
        for task in tasks
    ])

@app.route('/tasks', methods=['POST'])
def add_task():
    data = request.json
    new_task = Task(
        name=data['name'], due_date=data['due_date'],
        task_time=data['task_time'], priority=data['priority']
    )
    db.session.add(new_task)
    db.session.commit()
    return jsonify({"message": "Task added successfully!"}), 201

@app.route('/tasks/<int:task_id>', methods=['PUT'])
def toggle_task(task_id):
    task = Task.query.get_or_404(task_id)
    task.completed = not task.completed
    db.session.commit()
    return jsonify({"message": "Task updated successfully!"})

@app.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    task = Task.query.get_or_404(task_id)
    db.session.delete(task)
    db.session.commit()
    return jsonify({"message": "Task deleted successfully!"})


# from flask import Flask, render_template, redirect, url_for, request, flash, session
# from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user

# # //app = Flask(__name__)
# app.secret_key = 'your_secret_key'  # Change this to a secure key

# # Flask-Login Setup
# login_manager = LoginManager()
# login_manager.init_app(app)
# login_manager.login_view = 'login'  # Redirects to login page if unauthorized

# # Dummy User Data (Replace with Database Later)
# class User(UserMixin):
#     def __init__(self, id, username, password):
#         self.id = id
#         self.username = username
#         self.password = password

# users = {
#     "testuser": User(id=1, username="testuser", password="password123")  # Dummy User
# }

# @login_manager.user_loader
# def load_user(user_id):
#     for user in users.values():
#         if user.id == int(user_id):
#             return user
#     return None

# # Route for Home Page (Requires Login)
# @app.route('/')
# @login_required
# def index():
#     return render_template('index.html', user=current_user)

# # Route for Login
# @app.route('/login', methods=['GET', 'POST'])
# def login():
#     if request.method == 'POST':
#         username = request.form['username']
#         password = request.form['password']

#         user = users.get(username)
#         if user and user.password == password:
#             login_user(user)
#             flash("Login successful!", "success")
#             return redirect(url_for('index'))
#         else:
#             flash("Invalid credentials!", "danger")

#     return render_template('login.html')

# # Route for Logout
# @app.route('/logout')
# @login_required
# def logout():
#     logout_user()
#     flash("Logged out successfully!", "info")
#     return redirect(url_for('login'))

# if __name__ == '__main__':
#     app.run(debug=True)


@app.route('/subjects')
def subjects():
    return render_template('subjects.html')


if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5000, debug=True)
