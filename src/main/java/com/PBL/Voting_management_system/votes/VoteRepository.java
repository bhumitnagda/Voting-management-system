package com.PBL.Voting_management_system.votes;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface VoteRepository extends JpaRepository<Vote, Long> {
    boolean existsByStudentIdAndPositionId(long studentId, int positionId);

    @Query("SELECT v.candidateId, COUNT(v) FROM Vote v GROUP BY v.candidateId")
    List<Object[]> countVotesByCandidate();
}
