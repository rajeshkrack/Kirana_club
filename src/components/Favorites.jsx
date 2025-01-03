import React from "react";
import { Button, Card, Text, CalloutCard } from "@shopify/polaris";

const Favorites = ({ contests, favorites, onFavoriteToggle }) => {
  const favoriteContests = contests.filter((contest) =>
    favorites.includes(contest.id)
  );

  return (
    <Card title="Favorites" sectioned>
      <div className="max-h-48 overflow-y-auto">
        {favoriteContests.length > 0 ? (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Here is your favorite list
            </h3>
            {favoriteContests.map((contest) => (
              <div
                key={contest.id}
                className="flex justify-between items-center mb-4 py-2 px-4 border-b border-gray-300"
              >
                <Text variation="strong" className="text-lg text-gray-800">
                  {contest.name}
                </Text>
                <Button
                  onClick={() => onFavoriteToggle(contest.id)}
                  destructive
                  accessibilityLabel={`Remove ${contest.name} from favorites`}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-4 w-full">
            <CalloutCard
              title="No favorite contests yet"
              illustration="https://cdn.shopify.com/s/files/1/0264/2036/6839/files/empty-state.svg"
              primaryAction={{
                content: "Explore Contests",
                url: "/contests", // Replace with your actual contests page URL
              }}
              className="bg-gray-100 w-full p-4"
            >
              <p className="text-gray-600">
                You haven't added any contests to your favorites yet. Start exploring and add some!
              </p>
            </CalloutCard>
          </div>
        )}
      </div>
    </Card>
  );
};

export default Favorites;
