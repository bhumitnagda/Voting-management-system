package com.PBL.Voting_management_system.Candidates;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table
@Data
public class Candidates {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "NAME")
    private String name ;

    @Column(name = "DETAILS")
    private String details ;

    @Column(name = "AGE")
    private int age;
}
