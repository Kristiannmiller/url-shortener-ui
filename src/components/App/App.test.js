import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import App from './App.js';
import userEvent from '@testing-library/user-event';
import { getUrls, postUrl } from '../../apiCalls.js';
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
  describe('Integration tests', () => {
    it('should render a Url Form', async () => {
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
      const titleInput = screen.getByPlaceholderText('Title...')
      const urlInput = screen.getByPlaceholderText('URL to Shorten...')
      const submitButton = screen.getByText('Shorten Please!')
      expect(header).toBeInTheDocument()
      expect(titleInput).toBeInTheDocument()
      expect(urlInput).toBeInTheDocument()
      expect(submitButton).toBeInTheDocument()
    })
    it('should render a Url Container', async () => {
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
      const containerWrap = screen.getByTestId('urlContainer')
      expect(header).toBeInTheDocument()
      expect(containerWrap).toBeInTheDocument()
    })
    it('should call getUrls after submitting a new url', async () => {
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
      const titleInput = screen.getByPlaceholderText('Title...')
      const urlInput = screen.getByPlaceholderText('URL to Shorten...')
      const submitButton = screen.getByText('Shorten Please!')
      expect(header).toBeInTheDocument()
      expect(titleInput).toBeInTheDocument()
      expect(urlInput).toBeInTheDocument()
      expect(submitButton).toBeInTheDocument()
      userEvent.type(titleInput, 'test1')
      userEvent.type(urlInput, 'test2')
      userEvent.click(submitButton)
      expect(postUrl).toHaveBeenCalledWith('test2', 'test1')
      expect(getUrls).toHaveBeenCalled()
    })
  })
})
