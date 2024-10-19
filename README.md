PPT Submission Link - https://www.canva.com/design/DAGT_20tse8/MRX0N2EbA5aLS0iEQZXmMQ/edit?utm_content=DAGT_20tse8&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton

### Project Setup Instructions

1. **Initialize myenv**:
   - This step typically refers to creating a virtual environment for your Python project. A virtual environment is an isolated environment that allows you to install packages specific to that project without affecting the global Python installation. 
   - You can create a virtual environment using the following command (assuming you're using `venv`):
     ```bash
     python -m venv myenv
     ```
   - After this command, a directory named `myenv` will be created in your project folder, containing the necessary files for the virtual environment.

2. **pip install requirements.txt**:
   - This command is used to install all the dependencies listed in a `requirements.txt` file. The `requirements.txt` file typically contains a list of package names and their versions that your project depends on.
   - To execute this command, ensure that your virtual environment (`myenv`) is activated first. On Windows, you can activate it with:
     ```bash
     myenv\Scripts\activate
     ```
     On macOS and Linux, use:
     ```bash
     source myenv/bin/activate
     ```
   - Once the virtual environment is activated, you can install the dependencies with:
     ```bash
     pip install -r requirements.txt
     ```

3. **python serverStart.py**:
   - This command runs the `serverStart.py` script. This script is likely responsible for starting a server, which could be a web server, an API server, or any other type of service that your application provides.
   - The specific behavior of this script will depend on the implementation inside `serverStart.py`. For example, it might initialize a Flask or Django application and start serving requests.

4. **python generation.py**:
   - Similar to the previous command, this runs the `generation.py` script. The name suggests that this script is likely responsible for generating some kind of output, which could be anything from generating a report, processing data, or creating a machine learning model, depending on your project.
   - The specifics of what happens in `generation.py` will also depend on its implementation.

### Documentation for Running NodeSync and the Chatbot Frontend

#### 1. **Running the NodeSync Script**
The NodeSync script is responsible for syncing between organization repositories and a MongoDB database.

**Steps:**

1. **Navigate to the NodeSync Folder**:
   Ensure you are in the correct directory where the `node app.js` script resides. This script likely handles the logic for syncing the organization's repositories with MongoDB.

   ```bash
   cd path/to/nodesync
   ```

2. **Install Dependencies**:
   Before running the application, ensure that all the necessary dependencies are installed. If the `package.json` file is present, run the following command to install them:

   ```bash
   npm install
   ```

3. **Run the NodeSync Script**:
   To start the synchronization between the organization’s repositories and the MongoDB database, execute the following command:

   ```bash
   node app.js
   ```

   - The `app.js` script is responsible for initiating the sync process. It connects to the MongoDB instance and performs the necessary operations on the organization’s repositories.
   - Make sure the MongoDB service is running, and the database configuration (connection strings, authentication, etc.) is correctly set in your script or environment variables.

---

#### 2. **Running the Chatbot Frontend**

The chatbot frontend resides in the `frontend` folder. Follow these steps to run the UI of the chatbot.

**Steps:**

1. **Navigate to the Frontend Folder**:
   Ensure you are in the correct directory for the frontend part of the project. The `frontend` folder contains the code for the user interface (UI) of the chatbot.

   ```bash
   cd path/to/frontend
   ```

2. **Install Dependencies**:
   If this is your first time running the frontend, install all necessary dependencies. The `package.json` file should list all required libraries for the frontend application.

   ```bash
   npm install
   ```

3. **Run the Frontend (Development Mode)**:
   To start the chatbot UI in development mode, where you can easily debug and see live updates as you make changes to the code, use the following command:

   ```bash
   npm run dev
   ```

   - This command typically starts a development server (such as `webpack-dev-server` or `Vite`) and serves the frontend on a local port (e.g., `http://localhost:3000`).
   - You can now access the chatbot UI by navigating to the given local address (e.g., `http://localhost:3000`) in your browser.

---

### Summary of Commands

1. **Run NodeSync**:
   ```bash
   cd path/to/nodesync
   npm install
   node app.js
   ```

2. **Run Chatbot Frontend**:
   ```bash
   cd path/to/frontend
   npm install
   npm run dev
   ```
