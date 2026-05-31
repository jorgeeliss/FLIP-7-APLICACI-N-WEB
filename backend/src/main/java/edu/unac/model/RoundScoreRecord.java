package edu.unac.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "round_scores")
public class RoundScoreRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "game_id", nullable = false)
    private GameHistory gameHistory;

    private int roundNumber;
    private String playerName;
    private int scoreObtained;

    public RoundScoreRecord() {
    }

    public RoundScoreRecord(int roundNumber, String playerName, int scoreObtained) {
        this.roundNumber = roundNumber;
        this.playerName = playerName;
        this.scoreObtained = scoreObtained;
    }

    
    public Long getId() { return id; }
    public GameHistory getGameHistory() { return gameHistory; }
    public void setGameHistory(GameHistory gameHistory) { this.gameHistory = gameHistory; }
    public int getRoundNumber() { return roundNumber; }
    public void setRoundNumber(int roundNumber) { this.roundNumber = roundNumber; }
    public String getPlayerName() { return playerName; }
    public void setPlayerName(String playerName) { this.playerName = playerName; }
    public int getScoreObtained() { return scoreObtained; }
    public void setScoreObtained(int scoreObtained) { this.scoreObtained = scoreObtained; }
}