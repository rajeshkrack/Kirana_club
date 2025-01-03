import React from "react";
import { Button, Card, Text, CalloutCard } from "@shopify/polaris";

const Favorites = ({ contests, favorites, onFavoriteToggle }) => {
  const favoriteContests = contests.filter((contest) =>
    favorites.includes(contest.id)
  );

  return (
    <Card title="Favorites" sectioned>
      {favoriteContests.length > 0 ? (
        favoriteContests.map((contest) => (
          <div
            key={contest.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1rem",
              padding: "0.5rem 0",
              borderBottom: "1px solid #e1e3e5",
            }}
          >
            <Text variation="strong">{contest.name}</Text>
            <Button
              onClick={() => onFavoriteToggle(contest.id)}
              destructive
              accessibilityLabel={`Remove ${contest.name} from favorites`}
            >
              Remove
            </Button>
          </div>
        ))
      ) : (
        <CalloutCard
          title="No favorite contests yet"
          illustration="https://cdn.shopify.com/s/files/1/0264/2036/6839/files/empty-state.svg"
          primaryAction={{
            content: "Explore Contests",
            url: "/contests", // Replace with your actual contests page URL
          }}
        >
          <p>You haven't added any contests to your favorites yet. Start exploring and add some!</p>
        </CalloutCard>
      )}
    </Card>
  );
};

export default Favorites;
