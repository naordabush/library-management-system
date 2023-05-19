package it.objectmethod.demo.spring.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import it.objectmethod.demo.spring.models.MemberObject;
import it.objectmethod.demo.spring.services.MembersService;

@RestController
public class MembersController {

	@Autowired
	private MembersService ms;

	@GetMapping("/members/all")
	public List<MemberObject> getAllMembers() {
		return ms.getAllMembers();
	}

	@GetMapping("/members/get/{index}")
	public Object getOneMember(@PathVariable Long index) {
		return ms.getOneMember(index);
	}

	@DeleteMapping("/members/remove/{index}")
	public void removeMember(@PathVariable Long index) {
		ms.removeMember(index);
	}

	@PostMapping("/members/add")
	public void addNewMember(@RequestBody MemberObject member) {
		ms.addNewMember(member);
	}

	@PutMapping("members/edit")
	public void editMember(@RequestBody MemberObject member) {
		ms.editMember(member);
	}

	@PostMapping("/members/clear")
	public void clearList() {
		ms.clearList();
	}

}
