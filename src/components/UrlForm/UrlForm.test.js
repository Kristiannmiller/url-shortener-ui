import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import UrlForm from './UrlForm.js';

describe('UrlForm', () => {
  describe('Unit tests', () => {
    it('should render a UrlForm', () => {
      render(
        <MemoryRouter>
          <UrlForm />
        </MemoryRouter>
      )
      const titleInput = screen.getByPlaceholderText('Title...')
      const urlInput = screen.getByPlaceholderText('URL to Shorten...')
      const submitButton = screen.getByText('Shorten Please!')
      expect(titleInput).toBeInTheDocument()
      expect(urlInput).toBeInTheDocument()
      expect(submitButton).toBeInTheDocument()
    })
    it('should hold the correct values when user types in inputs', () => {
      render(
        <MemoryRouter>
          <UrlForm />
        </MemoryRouter>
      )
      const titleInput = screen.getByPlaceholderText('Title...')
      const urlInput = screen.getByPlaceholderText('URL to Shorten...')
      const submitButton = screen.getByText('Shorten Please!')
      expect(titleInput.value).toBe('')
      expect(urlInput.value).toBe('')
      expect(submitButton).toBeInTheDocument()
      userEvent.type(titleInput, 'test1')
      expect(titleInput.value).toBe('test1')
      userEvent.type(urlInput, 'test2')
      expect(urlInput.value).toBe('test2')
    })
    it('should invoke a given function when submit button is clicked', () => {
      const mockedFunction = jest.fn()
      render(
        <MemoryRouter>
          <UrlForm
            addUrl={mockedFunction}
          />
        </MemoryRouter>
      )
      const titleInput = screen.getByPlaceholderText('Title...')
      const urlInput = screen.getByPlaceholderText('URL to Shorten...')
      const submitButton = screen.getByText('Shorten Please!')
      expect(titleInput).toBeInTheDocument()
      expect(urlInput).toBeInTheDocument()
      expect(submitButton).toBeInTheDocument()
      userEvent.type(titleInput, 'test1')
      userEvent.type(urlInput, 'test2')
      userEvent.click(submitButton)
      expect(mockedFunction).toHaveBeenCalledWith('test2', 'test1')
    })
  })
})
