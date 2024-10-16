package com.PBL.Voting_management_system.Candidates;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CandidatesService {

    @Autowired
    private CandidatesRepository candidateRepository;

    public List<Candidates> getAllCandidates() {
        return candidateRepository.findAll();
    }

    public Candidates getCandidateById(Long id) {
        return candidateRepository.findById(id).orElse(null);
    }

    public Candidates addOrUpdateCandidate(Candidates candidate) {
        return candidateRepository.save(candidate);
    }

    public void deleteCandidate(Long id) {
        candidateRepository.deleteById(id);
    }
}