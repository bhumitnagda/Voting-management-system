package com.PBL.Voting_management_system.votes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class VoteService {

    @Autowired
    private VoteRepository voteRepository;

    public boolean hasUserVoted(long studentId, int positionId) {
        return voteRepository.existsByStudentIdAndPositionId(studentId, positionId);
    }

    public void saveVote(Vote vote) {
        voteRepository.save(vote);
    }


    public Map<Integer, Long> getVoteCountByCandidate() {
        List<Object[]> results = voteRepository.countVotesByCandidate();
        Map<Integer, Long> voteCountMap = new HashMap<>();
        for (Object[] result : results) {
            Integer candidateId = (Integer) result[0];
            Long count = (Long) result[1];
            voteCountMap.put(candidateId, count);
        }
        return voteCountMap;
    }
}