import React from "react";

import "./IndividualResults.css";
import { IndividualSearchResults } from "./IndividualSearch";

interface IIndividualSearchProps {
    initialResults: IndividualSearchResults | null
}

interface IIndividualSearchState {
    initialResults: IndividualSearchResults | null
}

function capitalizeFirstLetter(inp: string): string {
    return inp.charAt(0).toUpperCase() + inp.slice(1);
}

class IndividualSearch extends React.Component<IIndividualSearchProps, IIndividualSearchState> {

    constructor(props: IIndividualSearchProps) {
        super(props);

    }

    static getDerivedStateFromProps(props: IIndividualSearchProps, state: IIndividualSearchState) {
        // TODO: There are probably better ways to check if things have changed
        if (props.initialResults) {
            return {
                initialResults: props.initialResults
            };
        }
        return null;
    }

    render() {
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
        return (
            <div className="individual-results">
                <h2>Results for <a href={url}>{firstNameCapped + " " + lastNameCapped}</a></h2>
            </div>
        );
    }
};

export default IndividualSearch;