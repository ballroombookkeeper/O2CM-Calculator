import React from "react";

import "./IndividualResults.css";
import { IndividualCompetitionResults, IndividualSearchResults } from "./IndividualResultTypes";

interface IIndividualSearchProps {
    initialResults: IndividualSearchResults | null;
    isLoading: boolean;
}

interface IIndividualSearchState {
    initialResults: IndividualSearchResults | null;
    isLoading: boolean;
}

function capitalizeFirstLetter(inp: string): string {
    return inp.charAt(0).toUpperCase() + inp.slice(1);
}

class IndividualSearch extends React.Component<IIndividualSearchProps, IIndividualSearchState> {

    constructor(props: IIndividualSearchProps) {
        super(props);
        this.state = {
            initialResults: null,
            isLoading: false
        };
    }

    static getDerivedStateFromProps(props: IIndividualSearchProps, state: IIndividualSearchState) {
        // TODO: There are probably better ways to check if things have changed
        if (props.isLoading !== state.isLoading) {
            return {
                isLoading: props.isLoading
            };
        }

        if (props.initialResults) {
            return {
                initialResults: props.initialResults
            };
        }
        return null;
    }

    render() {
        if (this.props.isLoading) {
            return (
                <div className="individual-results">
                    <progress value="null" />
                </div>
            );
        }

        if (!this.props.initialResults) {
            return <div className="individual-results"></div>;
        }

        const firstName = this.props.initialResults.firstName;
        const lastName = this.props.initialResults.lastName;

        const firstNameCapped = capitalizeFirstLetter(firstName);
        const lastNameCapped = capitalizeFirstLetter(lastName);

        // TODO: Sanitize search criteria
        const url = `http://results.o2cm.com/individual.asp?szFirst=${firstName}&szLast=${lastName}`;

        // TODO: Add results
        const resultsRows = [];
        const results = this.props.initialResults.competitionResults;
        console.log(results);
        for (let resultsIdx = 0; resultsIdx < results.length; ++resultsIdx) {
            const competition = results[resultsIdx];
            let competitionName = competition.name;
            let competitionDate = competition.date.toDateString();
            for (let eventIdx = 0; eventIdx < competition.eventResults.length; ++eventIdx) {
                const event = competition.eventResults[eventIdx];
                const eventName = event.name;
                const placement = event.placement;
                const eventUrl = event.url;
                resultsRows.push(<tr>
                    <td>{competitionName}</td>
                    <td>{competitionDate}</td>
                    <td><a href={eventUrl}>{eventName}</a></td>
                    <td>{placement}</td>
                    <td>?</td>
                </tr>);
                competitionName = "";
                competitionDate = "";
            }
        }
        return (
            <div className="individual-results">
                <h2>Results for <a href={url}>{firstNameCapped + " " + lastNameCapped}</a></h2>
                {/*
                <table className='table' id="summary-table">
                    <thead><tr><th>Totals</th><th></th><th>Bronze</th><th>Silver</th><th>Gold</th></tr></thead>
                </table>
                */}

                <table className='table' id="results-table">
                    <thead><tr><th>Competition</th><th>Date</th><th>Event</th><th>Placement</th><th>Rounds</th></tr></thead>
                    {resultsRows}
                </table>
            </div>
        );
    }
};

export default IndividualSearch;