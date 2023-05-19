package it.objectmethod.demo.spring.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import it.objectmethod.demo.spring.models.UserObject;
import it.objectmethod.demo.spring.services.UsersService;

@CrossOrigin
@RestController

public class UserController {

	@Autowired
	private UsersService us;

	@GetMapping(value = "/users/all", produces = MediaType.APPLICATION_JSON_VALUE)
	public Iterable<UserObject> getAllUsers() {
		return us.getAllUsers();
	}

	@PostMapping("/users/login")
	public ResponseEntity<String> login(@RequestBody UserObject userObject) {
		String username = userObject.getUsername();
		String password = userObject.getPassword();
		String token = us.login(username, password);

		if (token == null) {
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		} else {
			return new ResponseEntity<>(token, HttpStatus.OK);
		}
	}

	@PostMapping("/users/register")
	public ResponseEntity<String> register(@RequestBody UserObject userObject) {
		String username = userObject.getUsername();
		String password = userObject.getPassword();
		UserObject user = us.register(username, password);
		if (user == null) {
			return new ResponseEntity<>("there is a problem with your request", HttpStatus.BAD_REQUEST);
		} else {
			return new ResponseEntity<>("you were registered", HttpStatus.OK);
		}
	}

	@GetMapping("/users/get/{index}")
	public Object getOneUser(@PathVariable Long index) {
		return us.getOneUser(index);
	}

	@DeleteMapping("/users/remove/{index}")
	public void removeUser(@PathVariable Long index) {
		us.removeUser(index);
	}

	@PutMapping("users/edit/{index}/{username}/{password}")
	public void editUser(@PathVariable Long index, @PathVariable String username, @PathVariable String password) {

		us.editUser(index, username, password);
	}

	@PostMapping("/users/clear")
	public void clearList() {
		us.clearList();
	}

}
