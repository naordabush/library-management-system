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

import it.objectmethod.demo.spring.models.BookObject;
import it.objectmethod.demo.spring.services.BooksService;

@RestController
public class BooksController {

	@Autowired
	private BooksService bs;

	@GetMapping("/books/all")
	public List<BookObject> getAllBooks() {
		return bs.getAllBooks();
	}

	@GetMapping("/books/all/null")
	public List<BookObject> getAllNull() {
		return bs.getAllNull();
	}

	@GetMapping("/books/all/notnull")
	public List<BookObject> getAllNotNull() {
		return bs.getAllNotNull();
	}

	@GetMapping("/books/get/{index}")
	public Object getOneBook(@PathVariable Long index) {
		return bs.getOneBook(index);
	}

	@DeleteMapping("/books/remove/{index}")
	public void removeBook(@PathVariable Long index) {
		bs.removeBook(index);
	}

	@PostMapping("/books/add")
	public void addNewBook(@RequestBody BookObject book) {
		bs.addNewBook(book);
	}

	@PutMapping("books/edit")
	public void editBook(@RequestBody BookObject book) {
		bs.editBook(book);
	}

	@PostMapping("/books/clear")
	public void clearList() {
		bs.clearList();
	}

}
