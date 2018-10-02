import React, {Component} from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './FAQView.styl';

class FAQView extends Component {
    constructor(props){
        super(props);
        this.state = {
            expanded: null,
        }
    }

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };

    render() {
        const { expanded } = this.state;
        const titleCommon = 'Як скористатися соціальною пропозицією?';
        const descriptionCommon = 'The lack of diversity within venture capital is something I have been hard at work to try and remedy and I write about frequently. In my last post, I laid out the demographic breakdowns of the venture industry and sought to disprove the notion that the reason that there are so few investors of color is because venture investors must be engineers, by showing that the majority of venture investors have no technical experience.\n' +
            '\n' +
            'Since my last post, I have updated my data and the results, and while there has been an improvement after 2 years, we still have a long way to go in improving diversity within our industry. The updated demographics can be found below.';
        return (
            <div className='faq-page-wrapper'>
                <div className='faq-page-content'>
                    <div className='faq-page-title'>Питання та відповіді </div>
                    <ExpansionPanel
                        className='faq-expansion-panel'
                        expanded={expanded === 'panel1'}
                        onChange={this.handleChange('panel1')}
                    >
                        <ExpansionPanelSummary className='faq-expansion-title-wrapper' expandIcon={<ExpandMoreIcon />}>
                            <Typography className='faq-expansion-title'>1.	Як прийняти участь в акції?</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className='faq-expansion-detail-wrapper'>
                            <Typography className='faq-expansion-detail'>
                                {descriptionCommon}
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel
                        className='faq-expansion-panel'
                        expanded={expanded === 'panel2'}
                        onChange={this.handleChange('panel2')}
                    >
                        <ExpansionPanelSummary className='faq-expansion-title-wrapper' expandIcon={<ExpandMoreIcon />}>
                            <Typography className='faq-expansion-title'>2.	Як саме та коли я зможу голосувати за товар?</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className='faq-expansion-detail-wrapper'>
                            <Typography className='faq-expansion-detail'>
                                {descriptionCommon}
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel
                        className='faq-expansion-panel'
                        expanded={expanded === 'panel3'}
                        onChange={this.handleChange('panel3')}
                    >
                        <ExpansionPanelSummary className='faq-expansion-title-wrapper' expandIcon={<ExpandMoreIcon />}>
                            <Typography className='faq-expansion-title' >3.	Коли я зможу отримати знижку на обраний  товар?</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className='faq-expansion-detail-wrapper'>
                            <Typography className='faq-expansion-detail'>
                                {descriptionCommon}
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel
                        className='faq-expansion-panel'
                        expanded={expanded === 'panel4'}
                        onChange={this.handleChange('panel4')}
                    >
                        <ExpansionPanelSummary className='faq-expansion-title-wrapper' expandIcon={<ExpandMoreIcon />}>
                            <Typography className='faq-expansion-title' >4.	Скільки всього номінацій, в яких можна гоосувати і обирати товари?</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className='faq-expansion-detail-wrapper'>
                            <Typography className='faq-expansion-detail'>
                                {descriptionCommon}
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel
                        className='faq-expansion-panel'
                        expanded={expanded === 'panel5'}
                        onChange={this.handleChange('panel5')}
                    >
                        <ExpansionPanelSummary className='faq-expansion-title-wrapper' expandIcon={<ExpandMoreIcon />}>
                            <Typography className='faq-expansion-title' >5.	Що означає “багаторазова знижка”?</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className='faq-expansion-detail-wrapper'>
                            <Typography className='faq-expansion-detail'>
                                {descriptionCommon}
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel
                        className='faq-expansion-panel '
                        expanded={expanded === 'panel6'}
                        onChange={this.handleChange('panel6')}
                    >
                        <ExpansionPanelSummary className='faq-expansion-title-wrapper' expandIcon={<ExpandMoreIcon />}>
                            <Typography className='faq-expansion-title' >6.	Що треба зробити, щоб отримати знижку на обраний товар</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className='faq-expansion-detail-wrapper'>
                            <Typography className='faq-expansion-detail'>
                                {descriptionCommon}
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel
                        className='faq-expansion-panel '
                        expanded={expanded === 'panel7'}
                        onChange={this.handleChange('panel7')}
                    >
                        <ExpansionPanelSummary className='faq-expansion-title-wrapper' expandIcon={<ExpandMoreIcon />}>
                            <Typography className='faq-expansion-title' >7.	Що робити, якщо знижка не застосується на касі?</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className='faq-expansion-detail-wrapper'>
                            <Typography className='faq-expansion-detail'>
                                {descriptionCommon}
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel
                        className='faq-expansion-panel '
                        expanded={expanded === 'panel8'}
                        onChange={this.handleChange('panel8')}
                    >
                        <ExpansionPanelSummary className='faq-expansion-title-wrapper' expandIcon={<ExpandMoreIcon />}>
                            <Typography className='faq-expansion-title' >8.	За скільки товарів можна проголосувати з кожної категорії, щоб отримати знижку?</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className='faq-expansion-detail-wrapper'>
                            <Typography className='faq-expansion-detail'>
                                {descriptionCommon}
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel
                        className='faq-expansion-panel '
                        expanded={expanded === 'panel9'}
                        onChange={this.handleChange('panel9')}
                    >
                        <ExpansionPanelSummary className='faq-expansion-title-wrapper' expandIcon={<ExpandMoreIcon />}>
                            <Typography className='faq-expansion-title' >9.	Де знайти номер моєї картки «Власний Рахунок»? </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className='faq-expansion-detail-wrapper'>
                            <Typography className='faq-expansion-detail'>
                                {descriptionCommon}
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel
                        className='faq-expansion-panel faq-expansion-last-panel'
                        expanded={expanded === 'pane20'}
                        onChange={this.handleChange('pane20')}
                    >
                        <ExpansionPanelSummary className='faq-expansion-title-wrapper' expandIcon={<ExpandMoreIcon />}>
                            <Typography className='faq-expansion-title' >10.	Як отримати знижку на алкогольні напої?</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className='faq-expansion-detail-wrapper'>
                            <Typography className='faq-expansion-detail'>
                                {descriptionCommon}
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </div>
            </div>
        );
    }
}

export default FAQView;
