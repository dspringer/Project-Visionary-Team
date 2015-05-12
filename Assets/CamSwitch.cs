using UnityEngine;
using System.Collections;

public class CamSwitch : MonoBehaviour {
	// Cameras to be used
	public Camera cam1;
	public Camera cam2;
	public Camera cam3;
	public Camera cam4;
	
	float interval = 3; // The time (in seconds) that one camera will be active
	float timer;        // Used to check if its time to activate another camera
	bool autoOn = true; // Whether or not the auto switch functionality is enabled
	int currentCam;     // Current camera in the array of cameras
	Camera [] cameras;  // Holder for all cameras
	
	void OnGUI (){
		GUI.Box (new Rect (10, 10, 200, 90), "Guide");
		
		if (GUI.Button (new Rect (20, 40, 180, 20), "Start Fireworks")) 
		{
			// Functionality to be added
		}
		GUI.Label (new Rect (20, 70, 180, 20), "To switch cam, press 'C'");
	}
	
	
	void Switch () {
		
		// disables the current camera in preparation of the next camera being enabled
		cameras [currentCam].enabled = false;
		
		// increments the current camera chosen, so that it can change to the next
		currentCam++;
		
		// ensures that the choice of the current camera is within an acceptable range
		currentCam = currentCam % cameras.Length;
		
		// enables the new camera
		cameras [currentCam].enabled = true;
	}
	
	
	void Start () {
		
		// ---------------- TO BE REFACTORED WITH A FOR LOOP -----------------
		// Sets the first camera as enabled and all others as disabled
		cam1.enabled = true;
		cam2.enabled = false;
		cam3.enabled = false;
		cam4.enabled = false;
		
		
		currentCam = 0;               // Set as the first camera in the array
		cameras = new Camera [4] { cam1 , cam2 , cam3 , cam4 };
		
		timer = Time.time + interval; // Timer is the time in the future
	}
	
	void UpdateTimer () {
		Switch ();
		timer += interval;
	}
	
	void Update () {
		
		if (Input.GetKeyDown (KeyCode.A)) {
			autoOn = true;
			UpdateTimer();
		}
		
		if (Input.GetKeyDown (KeyCode.C)) {
			autoOn = false;
			Switch();
		}
		
		if (autoOn) {
			if (Time.time >= timer) {
				UpdateTimer();
			}
		}
		
	}
}
