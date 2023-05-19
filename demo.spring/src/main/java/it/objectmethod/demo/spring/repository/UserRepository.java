package it.objectmethod.demo.spring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import it.objectmethod.demo.spring.models.UserObject;

@Repository
public interface UserRepository extends JpaRepository<UserObject, Long> {

	@Query(value = "SELECT * FROM users WHERE username=:username AND password=MD5(:password)", nativeQuery = true)
	UserObject login(@Param("username") String username, @Param("password") String password);

	@Query(value = "SELECT * FROM users WHERE username=:username", nativeQuery = true)
	UserObject register(@Param("username") String username);

}