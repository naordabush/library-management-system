package it.objectmethod.demo.spring.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import it.objectmethod.demo.spring.models.BookObject;

public interface BookRepository extends JpaRepository<BookObject, Long> {
	/*
	 * @Query("SELECT book FROM books book WHERE book.member.id = :memberId")
	 * List<BookObject> findByMemberId(@Param("memberId") Long memberId);
	 */

	List<BookObject> findByMemberObjectIdNull();

	List<BookObject> findByMemberObjectIdNotNull();

}
