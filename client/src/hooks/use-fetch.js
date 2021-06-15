import { useState } from 'react';
import axios from 'axios'
import { createToken } from '../utils/fire'
import { BACKEND_URL } from '../utils/config'

const useFetchData = (urlPath) => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const url = BACKEND_URL.concat(urlPath)

	const load = async () => {
		setLoading(true);
		try {
			const header = await createToken();
			const response = await axios.get(url, header);
			
			console.log(`[useFetch] URL:${url}. Status:${response.status}`)
			console.log('[useFetch] Response data:', response.data)

			setData(response.data);
			return(response.data)
		} catch (e) {
			console.log('[useFetch] Error doing fetch', e)
			setError(e);
		} finally {
			setLoading(false);
		}
	}

	return [data, loading, error, load];
}

export default useFetchData
