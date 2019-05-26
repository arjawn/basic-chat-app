/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import firebase from 'firebase';

class FirebaseSDK {
    constructor() {
        if (!firebase.apps.length) {
            //avoid re-initializing
            firebase.initializeApp({
                apiKey: 'AIzaSyC5nO_9b7Ywm4o59hn1WSEpryki9i1o6EM',
                authDomain: 'chat-app-c88bd.firebaseapp.com',
                databaseURL: 'https://chat-app-c88bd.firebaseio.com',
                projectId: 'chat-app-c88bd',
                storageBucket: 'chat-app-c88bd.appspot.com',
                messagingSenderId: '16204925936'
            });
        }
    }

    login = async (user, success_callback, failed_callback) => {
        await firebase
            .auth()
            .signInWithEmailAndPassword(user.email, user.password)
            .then(success_callback, failed_callback);
    };

    createAccount = async user => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(user.email, user.password)
            .then(
                function() {
                    console.log(
                        'created user successfully. User email:' +
                            user.email +
                            ' name:' +
                            user.name
                    );
                    var userf = firebase.auth().currentUser;
                    userf.updateProfile({ displayName: user.name }).then(
                        function() {
                            console.log(
                                'Updated displayName successfully. name: ' +
                                    user.name
                            );
                            alert(
                                'User ' +
                                    user.name +
                                    ' was created successfully. Please login.'
                            );
                        },
                        function(error) {
                            console.warn('Error update displayName.');
                        }
                    );
                },
                function(error) {
                    console.error(
                        'got error:' + typeof error + ' string:' + error.message
                    );
                    alert('Create account failed. Error: ' + error.message);
                }
            );
    };

    uploadImage = async uri => {
        try {
            const response = await fetch(uri);
            const blob = await response.blob();
            const ref = firebase
                .storage()
                .ref('avatar')
                .child(uuid.v4());
            const task = ref.put(blob);
            return new Promise((resolve, reject) => {
                task.on('state_changed', () => {}, reject, () =>
                    resolve(task.snapshot.downloadURL)
                );
            });
        } catch (err) {
            console.log('uploadImage error: ' + err.message);
        }
    };

    updateAvatar = url => {
        var userf = firebase.auth().currentUser;
        if (userf != null) {
            userf.updateProfile({ avatar: url }).then(
                function() {
                    console.log('Updated avatar successfully. url:' + url);
                    alert('Avatar image is saved successfully.');
                },
                function(error) {
                    console.warn('Error update avatar.');
                    alert('Error update avatar. Error:') + error.message;
                }
            );
        } else {
            console.log("Can't update avatar, user is not logged in.");
            alert('Unable to update avatar. You must login first.');
        }
    };

    onLogout = user => {
        firebase
            .auth()
            .signOut()
            .then(function() {
                console.log('Sign-out successful.');
            })
            .catch(function(error) {
                console.log('An error happened when signing out');
            });
    };

    get uid() {
        return (firebase.auth().currentUser || {}).uid;
    }

    get ref() {
        return firebase.database().ref('Messages');
    }

    parse = snapshot => {
        const { timestamp: numberStamp, text, user } = snapshot.val();
        const { key: _id } = snapshot;
        const timestamp = new Date(numberStamp);
        const message = { _id, timestamp, text, user };
        return message;
    };

    refOn = callback => {
        this.ref
            .limitToLast(20)
            .on('child_added', snapshot => callback(this.parse(snapshot)));
    };

    get timestamp() {
        return firebase.database.ServerValue.TIMESTAMP;
    }

    send = messages => {
        for (let i = 0; i < messages.length; i++) {
            const { text, user } = messages[i];
            const message = { text, user, createdAt: this.timestamp };
            this.ref.push(message);
        }
    };

    refOff() {
        this.ref.off();
    }
}

const firebaseSDK = new FirebaseSDK();
export default firebaseSDK;
