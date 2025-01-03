import React from "react";
import { Button, Card, Stack, TextStyle, EmptyState } from "@shopify/polaris";

const Favorites = ({ contests, favorites, onFavoriteToggle }) => {
  const favoriteContests = contests.filter((contest) =>
    favorites.includes(contest.id)
  );

  return (
    <Card title="Favorites" sectioned>
      {favoriteContests.length > 0 ? (
        favoriteContests.map((contest) => (
          <Stack key={contest.id} alignment="center" distribution="space-between">
            <TextStyle variation="strong">{contest.name}</TextStyle>
            <Button onClick={() => onFavoriteToggle(contest.id)} destructive>
              Remove from Favorites
            </Button>
          </Stack>
        ))
      ) : (
        <EmptyState
          heading="No favorite contests yet"
          image="https://cdn.shopify.com/s/files/1/0264/2036/6839/files/empty-state.svg"
        >
          <p>You haven't added any contests to your favorites yet.</p>
        </EmptyState>
      )}
    </Card>
  );
};

export default Favorites;
