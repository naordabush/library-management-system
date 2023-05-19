package it.objectmethod.demo.spring.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseBody;

import it.objectmethod.demo.spring.models.UserObject;
import it.objectmethod.demo.spring.repository.UserRepository;

@Service
public class UsersService {

	@Autowired
	private UserRepository ur;
	@Autowired
	private JwtService jwt;

	public @ResponseBody Iterable<UserObject> getAllUsers() {
		return ur.findAll();
	}

	public void clearList() {
		ur.deleteAll();
	}

	public void removeUser(Long index) {
		ur.deleteById(index);
	}

	public Object getOneUser(Long index) {
		return ur.findById(index).orElse(null);
	}

	public void editUser(Long index, String username, String password) {

		UserObject user = ur.findById(index).orElse(null);
		user.setUsername(username);
		user.setPassword(password);
		ur.save(user);

	}

	public String login(String username, String password) {
		UserObject user = ur.login(username, password);
		if (user != null) {
			String token = jwt.createJWTToken(user);
			return token;
		} else {
			return null;
		}
	}

	public UserObject register(String username, String password) {
		UserObject user = ur.register(username);
		UserObject newUser = new UserObject();

		if (user != null) {
			return null;
		}
		newUser.setUsername(username);
		newUser.setPassword(password);
		newUser.setRole("user");
		ur.save(newUser);

		return newUser;
	}

}
