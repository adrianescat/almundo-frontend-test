import { connect } from 'react-redux';
import * as hotelActions from '../actions/hotelActions';
import Hotels from '../components/Hotels';

// map state from store to props
const mapStateToProps = (state, ownProps) => {
  return {
    mappedHotelState: state.hotelState
  }
}

// map actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    fetchHotels: () => dispatch(hotelActions.fetchHotels())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Hotels);