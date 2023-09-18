import { Card, CardContent, CardTitle } from "./ui/card";

export default function PlacholderCard() {
  return (
    <Card className="flex flex-col animate-pulse">
      <CardTitle className="bg-gray-200 h-40 rounded mb-4"></CardTitle>
      <CardContent className="flex flex-col space-y-4">
        <div className="bg-gray-200 h-6 w-3/4"></div>
        <div className="bg-gray-200 h-4 w-1/2"></div>
        <div className="bg-gray-200 h-4 w-1/4"></div>
      </CardContent>
    </Card>
  );
}
