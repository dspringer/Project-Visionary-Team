
public var RemoteIP : String = "127.0.0.1"; //127.0.0.1 signifies a local host (if testing locally
public var SendToPort : int = 9000; //the port you will be sending from
public var ListenerPort : int = 8100; //the port you will be listening on
public var controller : Transform;
public var gameReceiver = "Cube"; //the tag of the object on stage that you want to manipulate
private var handler : Osc;
private var sphere1;
private var sphere2;
private var firePot1;
private var firePot2;
private var firePot3;
private var firePot4;
private var pulseColor;
private var isPulse = false;
private var colors = new Color[6];
private var colorToSet;

//VARIABLES YOU WANT TO BE ANIMATED
private var yRot : int = 0; //the rotation around the y axis

public function Start ()
{
	//Initializes on start up to listen for messages
	//make sure this game object has both UDPPackIO and OSC script attached

	var udp : UDPPacketIO = GetComponent("UDPPacketIO");
	udp.init(RemoteIP, SendToPort, ListenerPort);
	handler = GetComponent("Osc");
	handler.init(udp);
	handler.SetAllMessageHandler(AllMessageHandler);
	// Get Particle Systems
 	sphere1 = GameObject.Find("Omnidroid_2/Sphere_1").GetComponent(ParticleSystem);
 	sphere2 = GameObject.Find("Omnidroid/Sphere").GetComponent(ParticleSystem);
 	firePot1 = GameObject.Find("GrenadeWall/FirePots/FirePot1").GetComponent(ParticleSystem);
 	firePot2 = GameObject.Find("GrenadeWall/FirePots/FirePot2").GetComponent(ParticleSystem);
 	firePot3 = GameObject.Find("GrenadeWall/FirePots/FirePot3").GetComponent(ParticleSystem);
 	firePot4 = GameObject.Find("GrenadeWall/FirePots/FirePot4").GetComponent(ParticleSystem);
	Debug.Log(firePot4);
	
	//Set Up Color Array
	colors[0] = Color.blue;
	colors[1] = Color.red;
	colors[2] = Color.green;
	colors[3] = Color.white;
	colors[4] = Color.yellow;
	colors[5] = Color.cyan;
	
	//Set Any Default Characteristics of particle systems
	colorToSet = colors[3];
	firePot1.startColor = colorToSet;
	firePot2.startColor = colorToSet;
	firePot3.startColor = colorToSet;
	firePot4.startColor = colorToSet;

}
Debug.Log("Running");

function Update () {
	if(isPulse)
	{
		sphere1.play();
		sphere2.play();
		isPulse = false;
	}
	firePot1.startColor = colorToSet;
	firePot2.startColor = colorToSet;
	firePot3.startColor = colorToSet;
	firePot4.startColor = colorToSet;
}

//These functions are called when messages are received
//Access values via: oscMessage.Values[0], oscMessage.Values[1], etc

public function AllMessageHandler(oscMessage: OscMessage){


	var msgString = Osc.OscMessageToString(oscMessage); //the message and value combined
	var msgAddress = oscMessage.Address; //the message parameters
	var msgValue = oscMessage.Values[0]; //the message value
	Debug.Log(msgString); //log the message and values coming from OSC

	//FUNCTIONS YOU WANT CALLED WHEN A SPECIFIC MESSAGE IS RECEIVED
	switch (msgAddress){
	case'/Bass1':
		Debug.Log(msgValue);
		isPulse = true;
		break;
	case'/Bass2':
		Debug.Log(msgValue);
		break;
	case'/Trebel1':
		Debug.Log(msgValue);
		setPots(msgValue);
		break;
	case'/Trebel2':
		Debug.Log(msgValue);
		break;
	case'/Start':
		Debug.Log(msgValue);
		break;
	case'/Stop':
		Debug.Log(msgValue);
		break;
	default:
			
			break;
	}

}


//FUNCTIONS CALLED BY MATCHING A SPECIFIC MESSAGE IN THE ALLMESSAGEHANDLER FUNCTION
//Legacy Rotate Function - Sentimental Value
/*
public function Rotate(msgValue) : void //rotate the cube around its axis
{
	isPulse = true;
	
	
}
*/

public function setPots(msgValue) : void
{
	colorToSet = colors[Random.Range(0, colors.Length)];
	
}

