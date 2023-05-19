package it.objectmethod.demo.spring.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import it.objectmethod.demo.spring.models.MemberObject;

public interface MemberRepository extends JpaRepository<MemberObject, Long> {

}
