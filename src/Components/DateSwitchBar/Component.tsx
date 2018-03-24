import * as React from 'react';
import * as classNames from 'classnames';
import './Component.css';

export class DateSwitchBar extends React.Component<{}, { rotated: boolean }> {

    constructor(props: {}) {
        super(props);
        this.updateFromProps(props);

        this.state = { rotated: false };
    }

    componentDidMount() {
        setTimeout(() => { this.setState({ rotated: true }); }, 1000);
    }

    componentWillUpdate(nextProps: {}, nextState: {}) {
        this.updateFromProps(nextProps);
    }

    updateFromProps(props: {}) {
        // do nothing for now
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