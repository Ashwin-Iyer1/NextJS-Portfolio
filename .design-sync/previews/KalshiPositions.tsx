import React from "react";
import { KalshiPositions } from "newportfolio";
import { withFixtures } from "../preview-lib/fixtures";

// Field names and units mirror the Kalshi API the site's routes proxy: prices
// in cents, pnl and fees in hundredths of a dollar.

const POSITIONS = [
  {
    id: "1",
    series_category: "Economics",
    position_side: "YES",
    market_title: "Will the Fed cut rates at the September meeting?",
    yes_sub_title: "25+ bps cut",
    no_sub_title: "No cut",
    total_absolute_position: 250,
    current_price: 67,
    purchase_price: 48,
    pnl: 4750,
    fees_paid: 175,
    market_ticker: "FED-26SEP-C25",
    last_updated: "2026-07-22T14:31:00Z",
  },
  {
    id: "2",
    series_category: "Climate",
    position_side: "NO",
    market_title: "Will NYC hit 100°F before September?",
    yes_sub_title: "100°F or above",
    no_sub_title: "Stays below 100°F",
    total_absolute_position: 120,
    current_price: 22,
    purchase_price: 35,
    pnl: -1560,
    fees_paid: 90,
    market_ticker: "NYCHIGH-26AUG-100",
    last_updated: "2026-07-21T09:12:00Z",
  },
  {
    id: "3",
    series_category: "Technology",
    position_side: "YES",
    market_title: "Will SpaceX complete a crewed lunar flyby in 2026?",
    yes_sub_title: "Completed in 2026",
    no_sub_title: "Not in 2026",
    total_absolute_position: 80,
    current_price: 31,
    purchase_price: 29,
    pnl: 160,
    fees_paid: 40,
    market_ticker: "LUNAR-26-FLYBY",
    last_updated: "2026-07-20T18:45:00Z",
  },
];

const PROFILE = {
  metrics: {
    pnl: 334000,
    num_markets_traded: 47,
    volume: 128450,
    open_interest: 3120,
  },
};

export const WithPositions = withFixtures(
  { "/api/kalshi": POSITIONS, "/api/kalshi-profile": PROFILE },
  () => <KalshiPositions id="kalshi_positions" />,
);

// What the panel genuinely does with no API behind it — a real designed state.
export const ErrorState = () => <KalshiPositions id="kalshi_positions" />;
