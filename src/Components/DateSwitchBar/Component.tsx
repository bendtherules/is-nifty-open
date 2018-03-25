import * as React from 'react';
import * as classNames from 'classnames';
import './Component.css';

export class DateSwitchBar extends React.Component<{}, { rotated: boolean }> {

    constructor(props: {}) {
        super(props);
        this.state = { rotated: false };

        this.willBeCreated(props);
    }

    componentDidMount() {
        this.afterUpdated();
    }

    willBeCreated(props: {}) {
        this.setState({ rotated: false });
    }

    afterUpdated() {
        setTimeout(() => { this.setState({ rotated: true }); }, 1000);
    }

    render() {
        const iconClasses = ["icon"];
        if (this.state.rotated) {
            iconClasses.push("icon-rotated");
        }

        return (
            <div className="DateSwitchBar">
                <div className={classNames(iconClasses)} />
            </div>
        );
    }
}