export interface LeetCodeStats {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  acceptanceRate: number;
  ranking: number;
  contributionPoints: number;
  submissionCalendar: Record<string, number>;
}

export async function getLeetCodeStats(username: string): Promise<LeetCodeStats | null> {
  const query = `
    query getUserProfile($username: String!) {
      allQuestionsCount {
        difficulty
        count
      }
      matchedUser(username: $username) {
        submitStats {
          acSubmissionNum {
            difficulty
            count
            submissions
          }
        }
        profile {
            ranking
            reputation
        }
        submissionCalendar
      }
    }
  `;

  try {
    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Referer": "https://leetcode.com",
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      console.error("Failed to fetch LeetCode stats:", response.statusText);
      return null;
    }

    const data = await response.json();

    if (data.errors) {
      console.error("LeetCode GraphQL errors:", data.errors);
      return null;
    }

    const matchedUser = data.data.matchedUser;
    const submitStats = matchedUser.submitStats.acSubmissionNum;

    const easy = submitStats.find((s: { difficulty: string; count: number }) => s.difficulty === "Easy")?.count || 0;
    const medium = submitStats.find((s: { difficulty: string; count: number }) => s.difficulty === "Medium")?.count || 0;
    const hard = submitStats.find((s: { difficulty: string; count: number }) => s.difficulty === "Hard")?.count || 0;
    const total = submitStats.find((s: { difficulty: string; count: number }) => s.difficulty === "All")?.count || 0;

    return {
      totalSolved: total,
      easySolved: easy,
      mediumSolved: medium,
      hardSolved: hard,
      acceptanceRate: 0, // Not querying acceptance rate for now to keep it simple, or calculate if needed
      ranking: matchedUser.profile.ranking,
      contributionPoints: matchedUser.profile.reputation,
      submissionCalendar: JSON.parse(matchedUser.submissionCalendar || "{}"),
    };
  } catch (error) {
    console.error("Error fetching LeetCode stats:", error);
    return null;
  }
}
