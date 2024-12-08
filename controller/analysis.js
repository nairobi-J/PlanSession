 
 const dbConfig = require('../config/db')

 const startTime =  async (req, res) => {
    try {
      const connection = await mysql.createConnection(dbConfig);
  
      const [result] = await connection.execute(
        `SELECT HOUR(startTime) AS meeting_hour, COUNT(*) AS total_meetings
         FROM events 
         GROUP BY HOUR(startTime) 
         ORDER BY total_meetings DESC`
      );
  
      await connection.end();
      res.status(200).json(result);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      res.status(500).json({ msg: "Server error." });
    }
  }

const duration = async (req, res) => {
    try {
      const connection = await mysql.createConnection(dbConfig);
  
      const [result] = await connection.execute(
        `SELECT 
           CASE 
             WHEN TIMESTAMPDIFF(MINUTE, startTime, endTime) <= 30 THEN 'Short (<= 30 min)'
             WHEN TIMESTAMPDIFF(MINUTE, startTime, endTime) BETWEEN 31 AND 60 THEN 'Medium (31-60 min)'
             ELSE 'Long (> 60 min)'
           END AS duration_category,
           COUNT(*) AS total_meetings
         FROM events
         GROUP BY duration_category
         ORDER BY total_meetings DESC`
      );
  
      await connection.end();
      res.status(200).json(result);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      res.status(500).json({ msg: "Server error." });
    }
  }
  
  const topUsers = async (req, res) => {
    try {
      const connection = await mysql.createConnection(dbConfig);
  
      const [result] = await connection.execute(
        `SELECT 
           userId, 
           COUNT(*) AS total_meetings 
         FROM events 
         GROUP BY userId 
         ORDER BY total_meetings DESC 
         LIMIT 10`
      );
  
      await connection.end();
      res.status(200).json(result);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      res.status(500).json({ msg: "Server error." });
    }
  }

  const topTypes = async (req, res) => {
    try {
      const connection = await mysql.createConnection(dbConfig);
  
      const [result] = await connection.execute(
        `SELECT 
           userId, 
           COUNT(*) AS total_meetings 
         FROM events 
         GROUP BY userId 
         ORDER BY total_meetings DESC 
         LIMIT 10`
      );
  
      await connection.end();
      res.status(200).json(result);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      res.status(500).json({ msg: "Server error." });
    }

}

    const peakDays = async (req, res) => {
        try {
          const connection = await mysql.createConnection(dbConfig);
      
          const [result] = await connection.execute(
            `SELECT 
    DAYNAME(startTime) AS meeting_day, 
    COUNT(*) AS total_meetings 
FROM 
    events 
GROUP BY 
    meeting_day 
ORDER BY 
    FIELD(meeting_day, 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');`
          );
      
          await connection.end();
          res.status(200).json(result);
        } catch (error) {
          console.error('Error fetching analytics:', error);
          res.status(500).json({ msg: "Server error." });
        }
    
  }


  const averageDuration = async (req, res) => {
    try {
      const connection = await mysql.createConnection(dbConfig);
  
      const [result] = await connection.execute(
        `SELECT AVG(TIMESTAMPDIFF(MINUTE, startTime, endTime)) AS avg_duration FROM events;;`
      );
  
      await connection.end();
      res.status(200).json(result);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      res.status(500).json({ msg: "Server error." });
    }

}


module.exports = {startTime, duration, topUsers, topTypes, peakDays, averageDuration}


