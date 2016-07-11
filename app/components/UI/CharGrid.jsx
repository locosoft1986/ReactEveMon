import React, {Component, PropTypes} from 'react';
import CharGridItem from './CharGridItem';
import style from './CharGrid.scss';


class CharGrid extends Component {
  groupItemsInRows(items) {
    const itemsPerRow = 4;
    return items.reduce((rows, item, index) => {
      const position = Math.floor(index / itemsPerRow);
      if (!rows[position]) {
        rows[position] = []; // eslint-disable-line no-param-reassign
      }

      rows[position].push(item);
      return rows;
    }, []);
  }

  render() {
    const { characters, onSelect } = this.props;

    if (!characters.length) {
      return <p>{'No results, Please click + button in the right-bottom corner to add characters'}</p>;
    }

    return (
      <div className={style.charGrid}>
        {this.groupItemsInRows(characters).map((row, rowIdx) =>
          <div key={rowIdx} className={style.grid}>
            {row.map(char =>
              <CharGridItem className={style.item}
                key={char.characterID}
                character={char}
                onSelect={onSelect}/>
            )}
          </div>
        )}
      </div>
    );
  }
}

CharGrid.propTypes = {
  characters: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired
};


export default CharGrid;
