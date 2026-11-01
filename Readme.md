# Hola
A simple peer-to-peer video calling application that lets two people connect through a shareable room link. No accounts or registration required.

Hola is a lightweight video calling web application designed for one-to-one communication. Users can create a call room and share its link with another person to start a video conversation.

The application uses PeerJS to establish peer-to-peer connections and WebRTC to handle real-time audio and video communication. It provides a simple interface with essential call controls, allowing users to manage their microphone, camera, and calls.

- Create a unique room code automatically.
- Generate a shareable link to invite another person.
- Join a call directly using the shared link.
- Real-time audio and video communication.
- Toggle microphone on and off.
- Turn camera on and off.
- End the call using the hang-up button.
- No account or registration required.

**Lobby / Room Creation**

![Lobby Screenshot](screenshots/lobby.png)

**Video Calling Interface**

![Video Call Screenshot](screenshots/video-call.png)

- A modern web browser such as Google Chrome, Firefox, or Microsoft Edge.
- HTML5 and CSS3.
- JavaScript (ES6+).
- PeerJS 1.4.7.
- A working webcam and microphone.
- Internet connection.
- HTTPS or localhost for camera and microphone acces
1. Clone the repository:

   ```bash
   git clone https://github.com/tryankita/hola.git
   ```

2. Navigate to the project directory:

   ``  `bash
   cd hola
   ```

3. Ensure the project contains the following files:

   ```text
   hola/
   ├── index.html
   ├── style.css
   ├── script.js
└── README.md
   ```

4. No additional package installation is required because PeerJS is lo aded through a CDN in the HTML file.

1. Open the project using a local development server.

2. Open the following address in your browser:

   ```text
   http://localhost:8000
   ```

3. Allow camera and microphone permissions when prompted.

4. A unique room link will be generated automatically.

5. Copy the link and share it with the other person.

6. The other person can open the shared link in their browser to join the call.

7. Use the microphone and camera buttons to control your audio and video. Select the hang-up button to end the call.

**Camera or microphone not working**

- Ensure your browser has permission to access your camera and microphone.
- Check that your webcam and microphone are connected and working.
- Use HTTPS or localhost when accessing the application.

**Unable to connect to another person**

- Check that both users have an active internet connection.
- Make sure the shared room link is correct.
- Ensure the room creator has not closed the browser or ended the call.

**Application not loading**

- Check your internet connection because PeerJS is loaded from a CDN.
- Verify that all project files are present.
- Check the browser console for JavaScript errors.

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.