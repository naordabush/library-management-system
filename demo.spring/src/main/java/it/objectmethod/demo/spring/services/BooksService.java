package it.objectmethod.demo.spring.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.objectmethod.demo.spring.models.BookObject;
import it.objectmethod.demo.spring.repository.BookRepository;

@Service
public class BooksService {
	@Autowired
	private BookRepository br;

	public List<BookObject> getAllBooks() {
		return br.findAll();
	}

	public Object getOneBook(Long index) {
		return br.findById(index).orElse(null);
	}

	public void removeBook(Long index) {
		br.deleteById(index);
	}

	public void clearList() {
		br.deleteAll();

	}

	public void addNewBook(BookObject book) {
		br.save(book);
	}

	public void editBook(BookObject book) {
		br.save(book);

	}

	public List<BookObject> getAllNull() {
		return br.findByMemberObjectIdNull();

	}

	public List<BookObject> getAllNotNull() {
		return br.findByMemberObjectIdNotNull();
	}

}
