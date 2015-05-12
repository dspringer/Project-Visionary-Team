using UnityEngine;
using System.Collections;

public class Orbit : MonoBehaviour {

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	transform.RotateAround (GameObject.FindGameObjectWithTag("Player").transform.position, Vector3.up, 20 * Time.deltaTime);

	}
}
