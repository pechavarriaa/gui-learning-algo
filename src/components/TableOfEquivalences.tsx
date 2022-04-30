import { useTheme } from '@fluentui/react';
import { FC, CSSProperties } from 'react';
import {
    enumOfBAR,
    BooleanAlgebraRelations,
} from '../definitions/BooleanAlgebraRelations';
import { relationImages } from '../definitions/relationsImages';

export const TableOfEquivalences: FC = () => {
    const theme = useTheme();
    const tableCellStyle: CSSProperties = {
        borderCollapse: 'collapse',
        border: `2px solid ${theme.palette.tealLight}`,
        padding: '5px',
    };
    return (
        <table
            style={{
                position: 'fixed',
                marginTop: '15px',
                left: '80%',
                top: '10%',
                textAlign: 'left',
                borderCollapse: 'collapse',
                border: `1px solid ${theme.palette.tealLight}`,
            }}
        >
            <thead>
                <tr>
                    <th style={tableCellStyle}>No.</th>
                    <th style={tableCellStyle}>Relation</th>
                    <th style={tableCellStyle}>Image</th>
                </tr>
            </thead>
            <tbody>
                {Object.entries(enumOfBAR).map(
                    ([BarAsString, BarAsNumber], i) => (
                        <tr key={i}>
                            <td style={tableCellStyle}>{BarAsNumber}</td>
                            <td style={tableCellStyle}>
                                {BooleanAlgebraRelations[BarAsString]}
                            </td>{' '}
                            <td style={tableCellStyle}>
                               <img src={relationImages[BarAsString]} alt={BarAsString} style={{height: '24px'}} />
                            </td>
                        </tr>
                    )
                )}
            </tbody>
        </table>
    );
};
