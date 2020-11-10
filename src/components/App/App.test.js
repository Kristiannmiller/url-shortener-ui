import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import App from './App.js';
import { getUrls } from '../../apiCalls.js';
jest.mock('../../apiCalls.js');

describe('App', () => {
  describe('Unit tests', () => {
    it('should render a header', () => {
      render(
        <App />
      )
      const header = screen.getByText('URL Shortener')
      expect(header).toBeInTheDocument()
    })
  })
  describe('Async tests', () => {
    it('should display any urls currently on the api', async () => {
      getUrls.mockResolvedValue(
        { urls: [{id: 1,
        long_url: 'longUrl1',
        short_url: 'shortUrl1',
        title: 'title1'},
        {id: 2,
        long_url: 'longUrl2',
        short_url: 'shortUrl2',
        title: 'title2'}] }
      )
      render(
        <App />
      )
      const header = screen.getByText('URL Shortener')
      const urlTitle1 = await waitFor(() => screen.getByText('title1'))
      const urlTitle2 = await waitFor(() => screen.getByText('title2'))
      const urlShort1 = await waitFor(() => screen.getByText('shortUrl1'))
      const urlShort2 = await waitFor(() => screen.getByText('shortUrl2'))
      expect(header).toBeInTheDocument()
      expect(getUrls).toHaveBeenCalled()
      expect(urlTitle1).toBeInTheDocument()
      expect(urlTitle2).toBeInTheDocument()
      expect(urlShort1).toBeInTheDocument()
      expect(urlShort2).toBeInTheDocument()
    })
  })

})
