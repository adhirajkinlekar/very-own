import React, { Component } from 'react';
import "./profile.styles.css";



class Profile extends Component {
    render() {
        return (
          
                <div className="profile-card">
                    {/* <div className="profile-header">
                        <img src="https://yt3.googleusercontent.com/ytc/AIdro_mw_uMuYGJpYoUEIvCrsfeYck6ajAjDG3VTPSFsqioBiw=s900-c-k-c0x00ffffff-no-rj" alt="Profile" className="avatar" />
                        <div className="profile-info">
                            <h2>Colt Steele</h2>
                            <p>Developer and Instructor</p>
                        </div>
                    </div> */}
                    <div className="profile-description">
                        <p>
                            Hi! I'm Colt. I'm a developer with a serious love for teaching.
                            I've spent the last few years teaching people to program at 2 different immersive bootcamps where
                            I've helped hundreds of people become web developers and change their lives.
                            My graduates work at companies like Google, Salesforce, and Square.
                        </p>
                        <b>
                            Join me on this crazy adventure!
                        </b>
                    </div> 
            </div>

        );
    }
}

export default Profile;