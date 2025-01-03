import React from "react";
import { Link } from "@shopify/polaris";
import { Button, Card, TextStyle } from "@shopify/polaris";

const ContestList = ({ contests, favorites, onFavoriteToggle }) => {
  return (
    <div className="space-y-4">
      <Card>
        <Card.Section>
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="border p-2">
                  <TextStyle variation="strong">Name</TextStyle>
                </th>
                <th className="border p-2">
                  <TextStyle variation="strong">Type</TextStyle>
                </th>
                <th className="border p-2">
                  <TextStyle variation="strong">Phase</TextStyle>
                </th>
                <th className="border p-2">
                  <TextStyle variation="strong">Start Time</TextStyle>
                </th>
                <th className="border p-2">
                  <TextStyle variation="strong">Favorite</TextStyle>
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
        </Card.Section>
      </Card>
    </div>
  );
};

export default ContestList;
