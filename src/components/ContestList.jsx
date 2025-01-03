import React from "react";
import { Link, Button, Card, Text } from "@shopify/polaris";

const ContestList = ({ contests, favorites, onFavoriteToggle }) => {
  return (
    <div className="space-y-4">
      <Card>
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="border p-2">
                  <Text variation="strong">Name</Text>
                </th>
                <th className="border p-2">
                  <Text variation="strong">Type</Text>
                </th>
                <th className="border p-2">
                  <Text variation="strong">Phase</Text>
                </th>
                <th className="border p-2">
                  <Text variation="strong">Start Time</Text>
                </th>
                <th className="border p-2">
                  <Text variation="strong">Favorite</Text>
                </th>
              </tr>
            </thead>
            <tbody>
              {contests.map((contest) => (
                <tr key={contest.id} className="border">
                  <td className="border p-2">
                    <Link url={`/contest/${contest.id}`} monochrome>
                      {contest.name}
                    </Link>
                  </td>
                  <td className="border p-2">{contest.type}</td>
                  <td className="border p-2">{contest.phase}</td>
                  <td className="border p-2">
                    {new Date(contest.startTimeSeconds * 1000).toLocaleString()}
                  </td>
                  <td className="border p-2 text-center">
                    <Button
                      onClick={() => onFavoriteToggle(contest.id)}
                      size="slim"
                      primary={favorites.includes(contest.id)}
                    >
                      {favorites.includes(contest.id) ? "Unfavorite" : "Favorite"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      </Card>
    </div>
  );
};

export default ContestList;
